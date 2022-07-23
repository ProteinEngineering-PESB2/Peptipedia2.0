from modules.api import api

api = api()
server = api.get_server()

if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8001, debug=True)
