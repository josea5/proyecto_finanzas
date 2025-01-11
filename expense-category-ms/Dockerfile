FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE 8000

CMD ["wait-for-it.sh", "mysql-categories:3306", "--", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
