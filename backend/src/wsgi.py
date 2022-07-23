from modules.api import api

api = api()
app = api.get_server()

if __name__ == "__main__":
    app.run()