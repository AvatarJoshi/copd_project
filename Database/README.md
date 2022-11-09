# COPD_Project
## Purpose & Background
For this project, we must first create a database. This database will hold all datasets we use and tables we generate for the final Machine Learning model. To do so, we utilized the QuickDBD webpage to create a rough draft of our schema for the project. The schema is supposed to resemble what our final database will look like (i.e. the information we expect our dataset to hold). We will include a Census Table, Air Quality Data Table, Coal Mines Table, and Places Table. Each of these tables hold essential information that tell us what factors play into Chronic Obstructive Pulminary Disease (COPD). After creating the schema, we used Postgres to create the actual database that will hold the tables and their corresponding data. Once the database is active, we connected the databse from Postgres to Jupyter Notebook. This step is crucial for our model, because it will allow us to draw directly from our databse and push information into the database. Being able to connect the two platforms means we can then take the final code from our model and apply it to any dataset related to the project by simply changing or adding what information the model uses. 

## Resources
- Jupyter Notebook
- Postgres
- PGAdmin
- SQL
- Python

## Results 

### Schema

Below is an image our current schema. Although it is a rough draft, it gives the main idea of the information that will exist in the database. 

![Screen Shot 2022-11-03 at 12 26 34 PM](https://user-images.githubusercontent.com/107595127/200192318-7013db97-ca92-4227-8678-fbc923dc1976.png)

** Note ** 

The Census table still needs to be added into database. It is a large dataset the requires more precision. 

### Database

Below is an image of what the Postgres database in PGAdmin looks like. 

<img width="1160" alt="Screen Shot 2022-11-06 at 12 05 37 PM" src="https://user-images.githubusercontent.com/107595127/200192519-d9aae5e5-34cd-4414-9d38-a720a0031b09.png">

### Jupyter Notebook
Below are examples from our Jupyter Notebook and how we connected our databse with Jupyter Notebook, along with examples of how we can call information directly from our database. 

<img width="947" alt="Screen Shot 2022-11-06 at 12 09 37 PM" src="https://user-images.githubusercontent.com/107595127/200192746-a1eac2a6-c727-42b2-a7bb-820466d3c70d.png">

<img width="615" alt="Screen Shot 2022-11-06 at 12 08 13 PM" src="https://user-images.githubusercontent.com/107595127/200192750-c8acc998-2ce0-4512-92f1-2bb4417b659f.png">

<img width="1097" alt="Screen Shot 2022-11-06 at 12 08 03 PM" src="https://user-images.githubusercontent.com/107595127/200192763-b4be1c6f-82f4-4142-b2c0-71e1cd9651c5.png">

## Summary
Success! Our database and notebook are communicating without issues. There are definitely a few minor adjustments to be made and some details to be straightened out, but the platforms are communicating. This will allow us to create a model that reads information directly form our databse. We must still generate a way to push data from jupyter notebook into the database, but once that is done the two platforms could be used interchangeably. This step will allow us to incorporate additional data in the future by simply changing the names/file pathways we want our machine learning model to use. 
