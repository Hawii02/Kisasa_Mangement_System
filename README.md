# Kisasa Management System

The Kisasa Management System provides banks with an integrated platform to manage their transaction, assets, holdings and accounts data efficiently. It offers a user-friendly interface and responsive design to facilitate seamless navigation and operation. The system's scalability feature enables banks to update customer details and track transactions effectively, eliminating the risk associated with current systems' inability to handle increasing demands. Built using Python Flask for the backend and React.js for the frontend.

# Description

The Kisasa Management System offers a comprehensive solution for banks seeking to efficiently manage their transaction, assets, accounts and holdings data across different levels of operation. With Kisasa, banks can effectively handle transaction data in a user-friendly and responsive interface, ensuring scalability to accommodate the growing demands of their customer base.

# Components

1. Admin
   - Manages administrative tasks such as user management and system configuration.

2. Client
   - Handles client-related operations including user registration, profile management, and account linking.

3. Account
   - Manages user accounts, including withdrawal and deposit
4. Transactions
   - Facilitates the execution and recording of financial transactions, including deposits, withdrawals, and transfers.

5. Assets
   - Tracks various types of assets owned by clients, including their values, purchase prices, and purchase dates.

6. Holdings
   - Tracks the holdings of assets associated with user accounts, including the number of shares, purchase prices, and purchase dates.

# Seed Data Generation

The seed data generation process populates the database with mock data to simulate real-world scenarios and facilitate development and testing. The process involves generating random client data, account data, transaction data, asset data, and holdings data using the Faker library.
Steps to Generate Seed Data

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
(requirement.txt is in the file)

2. Run the seed data generation script:
   ```bash
   python seed.py
   ```

3. Verify that the database has been populated with the generated seed data.

# Customization

You can customize the seed data generation process to adjust the distribution of data or add additional fields as needed. Ensure that the generated data maintains integrity constraints defined in the database schema.

 Dependencies
 Backend Dependencies

The backend of the Kisasa Management System relies on the following dependencies:

- Flask
- Flask-Bcrypt
- PyJWT
- bcrypt (for development purposes)
- Flask-Migrate (for development purposes)
- Flask-Serializer (for development purposes)
- Flask-Cors (for development purposes)
- Flask-RESTful (for development purposes)
- Flask-SQLAlchemy (for development purposes)

For detailed information about the backend dependencies and their versions, refer to the `requirements.txt` file.
Frontend Dependencies

The frontend of the Kisasa Management System, located in the `client` folder, is built using React.js and relies on the following dependencies:

- React.jsx
- JSX Chart

For detailed information about the frontend dependencies and their versions, refer to the `package.json` file in the `client` directory.

 Installation

To install the Kisasa Management System locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <https://github.com/Hawii02/Kisasa_Mangement_System>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project_directory>
   ```

3. Install the required backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
(requirement.txt is in the file)
4. Navigate to the frontend directory:
   ```bash
   cd client
   ```

5. Install the required frontend dependencies:
   ```bash
   npm install
   ```

 Usage

To run the Kisasa Management System locally, follow these steps:

1. Ensure that the database is set up and populated with seed data (if necessary).

2. Run the Flask backend:
   ```bash
   python app.py
   ```

3. Run the React.jsx frontend:
   ```bash
   npm run dev
   ```

4. Access the application in your web browser at `http://localhost:3000`.

Future Enhancements

As the project evolves, additional features and enhancements can be introduced based on user feedback and business requirements.

# Credits

This project was developed and contributed by the following programmers:
Leon 
Ian
Felix
Norah

# License
This project is licensed under the [Moringa school License](LICENSE).

