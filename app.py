import json
import warnings
warnings.filterwarnings("ignore")
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import pandas as pd
from datetime import datetime

app=Flask(__name__)
CORS(app, resources={r"/upload_csv": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER='uploads'
#create folder to upload files if it does not exist already
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

date_formats = ["%Y-%m-%d", "%d-%m-%Y", "%m-%d-%Y", "%Y/%m/%d", "%d/%m/%Y", "%m/%d/%Y"]
mandateColumns=['decision_month','forecast_month','index_commodity_id','price_forecast']
def detect_date_format(df):
    
    for col in df.columns:
        try:
            df[col] = pd.to_datetime(df[col], errors='raise')
            detected_format = None
            for date_format in date_formats:
                try:
                    df[col].dt.strftime(date_format)
                    detected_format = date_format
                    df[col] = df[col].sort_values(ascending=True)
                    start_date=str(df[col].head(1).dt.date.values[0])
                    end_date=str(df[col].tail(1).dt.date.values[0])
                    return detected_format,start_date,end_date
                except ValueError:
                    continue

        except (ValueError, pd.errors.OutOfBoundsDatetime):
            continue

    return "No date column"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    response_data={}
    try:
        if 'file' not in request.files: #if file cannot be accessed
            return jsonify({"Error": "No file"})
        file = request.files['file'] #else
        if file.filename == '': #if file name does not exist
            return jsonify({"Error": "No file was selected"})
        if file: #else
            filename = secure_filename(file.filename) #secure filename created to store file in local folders
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            df = pd.read_csv(file_path,delimiter=',')
            date_format,start_date,end_date=detect_date_format(df)
            row_count=df.shape[0]
            col_count=df.shape[1]
            columns = df.columns.tolist()
            column_info = {col: str(dtype) for col, dtype in df.dtypes.items()}
            null_values =df.isnull().sum().to_dict()
        
            null_rows=df[df.isnull().any(axis=1)].head(5).replace({pd.np.nan: None}).to_dict(orient='records')
            no_of_empty_rows=df.isnull().all(axis=1).sum()
            
            first_row = df.iloc[0].replace({pd.np.nan:None}).to_dict()
            last_row = df.iloc[-1].replace({pd.np.nan:None}).to_dict()
            mismatchedCols=set(columns).difference(set(mandateColumns))
            mandateColsAbsent=set(mandateColumns).difference(set(columns))
            mandateColsPresent=set(mandateColumns).difference(set(mandateColsAbsent))

            null_flag = True if df.isnull().values.any() else False

            for col, value in null_values.items():
                if pd.isna(value):
                    null_values[col] = None

            status=False
            if len(mandateColsAbsent) == 0 and no_of_empty_rows == 0:
                if all(value == 0 for value in null_values.values()):
                    status = True

            response_data={
                "status":status,
                "columns": columns,
                "description":column_info,
                "mandate_columns":mandateColumns,
                "absent_mandate_columns":list(mandateColsAbsent),
                "mandateAbsent_no":len(mandateColsAbsent),
                "mandatePresent_no":len(mandateColsPresent),
                "mandateColsPresent":list(mandateColsPresent), 
                "mismatched_columns":list(mismatchedCols),
                "mismatched_no":len(mismatchedCols),
                "rows":row_count,
                "cols":col_count,
                "null_no":null_values,
                "null_row":null_rows,
                "first_row":first_row,
                "last_row":last_row,
                "empty_no":str(no_of_empty_rows),
                "date_format":date_format,
                "start_date":start_date,
                "end_date":end_date,
                "null_flag":null_flag
            }
            return jsonify(response_data)
        
    except Exception as e:
        return jsonify({"error": str(e)})
    
if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)