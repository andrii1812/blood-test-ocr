FROM tiangolo/uwsgi-nginx-flask:python3.6

COPY ./src /app

RUN apt install tesseract-ocr
RUN pip install -r /app/requirements.txt

ENV STATIC_INDEX 1
ENV STATIC_PATH /app/web/static