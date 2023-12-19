import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

def create_connection():
    connection = sqlite3.connect('mydatabase.db')
    cursor = connection.cursor()

    # Create a users table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    connection.commit()
    return connection

def close_connection(connection):
    if connection:
        connection.close()

def create_user(username, password):
    connection = create_connection()
    cursor = connection.cursor()

    # Hash the password before storing it in the database
    hashed_password = generate_password_hash(password, method='sha256')

    # Insert a new user into the users table
    cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    
    connection.commit()
    close_connection(connection)

def authenticate_user(username, password):
    connection = create_connection()
    cursor = connection.cursor()

    # Retrieve the user from the users table
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()

    close_connection(connection)

    if user and check_password_hash(user[2], password):
        return True
    else:
        return False
from flask import Flask, render_template, request, redirect, url_for, flash
from db_handler import create_user, authenticate_user

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if authenticate_user(username, password):
        flash('Login successful!', 'success')
        return redirect(url_for('home'))
    else:
        flash('Login failed. Please check your credentials.', 'error')
        return redirect(url_for('home'))

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']

    create_user(username, password)
    flash('Registration successful! You can now log in.', 'success')
    return redirect(url_for('home'))

if __name__ == "__main__":
    app.run(debug=True)
