from locust import HttpUser, between, task

GET_USER_VOTES = "/get-user-votes/"
CALCULATE_VOTES = "/calculate-votes"
VOTE = "/vote"
GET_ALL_PIES = "/get-all-pies"
BAKE_PIE = '/bake-pie/'
ADD_IMAGE = '/add-image/:pieId/filename/:filename'
ADD_USER = '/add-user'
VERIFY_USER = '/verify-user'

COOKIE = r""
USERNAME = ""
PASSWORD = ""

class WebsiteUser(HttpUser):
    host = "https://pie-fest.com/backend"
    wait_time = between(1, 30)
    
    def on_start(self):
        print("Spawning Virtual User...")
    
    @task(10)
    def get_user_votes(self):
        self.client.get(GET_USER_VOTES + COOKIE)
    
    @task(10)
    def calculate_votes(self):
        self.client.get(CALCULATE_VOTES)
    
    @task(10)
    def vote(self):
        self.client.post(VOTE, json={
            "userId": COOKIE,
            "pieId": 50,
            "vote": 1.0
        })
    
    @task(10)
    def get_all_pies(self):
        self.client.get(GET_ALL_PIES)
    
    @task(3)
    def bake_pie(self):
        self.client.post(BAKE_PIE + "test-pie", json={
            "userId": COOKIE
        })
    
    @task(3)
    def add_image(self):
        self.client.post('/add-image/50/filename/test.jpg')
    
    @task(1)
    def add_user(self):
        self.client.post(ADD_USER, json={
            "username": USERNAME
        })
    
    @task(3)
    def verify_user(self):
        self.client.post(VERIFY_USER, json={
            "username": USERNAME,
            "password": PASSWORD
        })