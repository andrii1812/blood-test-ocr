import config
import web

if __name__ == '__main__':
    web.app.run(host=config.ADDRESS, port=config.PORT, debug=config.DEBUG)

