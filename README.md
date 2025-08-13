# Contract Test Automation and CRUD Flow with Cypress + Joi

In this project, I developed an automated test suite for the Serverest API, ensuring data quality and consistency through contract validation and end-to-end CRUD operations.

Main features tested:
Login → Authentication response contract validation.
Products → Ensure that all fields and types are correct (name, price, description, quantity, _id).
Cart → Creation with dynamic product and validated contract.
Complete CRUD Flow → Creating, listing, updating, and deleting resources with contract validation at each step.

# Technologies used:
I used Cypress to run the tests and Joi to validate the contracts, ensuring that any changes to the API structure are detected quickly.

# Result:
With these tests, it was possible to ensure stable integrations, detect contract changes before they reach production, and keep communication between the backend and frontend consistent.


## Installation
```bash
npm install
```
> **NOTE:**
>
> it is necessary to have **node** installed

## Running
```bash
# You open the Cypress UI
npx cypress open
