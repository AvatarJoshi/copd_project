# COPD_Project

## Background

**Describe the idea and how it’s a valid idea**

- Chronic-obstructive pulmonary disease (COPD) is a group of diseases that lead to airflow blockage and breathing-related problems. COPD represents a significant threat to public health in the United States. In 2018, there were estimated to be 156,045 deaths due to COPD making it the 4th overall leading cause of death. COPD is known to be caused by smoking, exposure to worksite pollutants, and genetic factors. In addition, new evidence suggests that prolonged exposure to air pollutants can also lead to COPD.

- Data visualizations for COPD and many of its corresponding risk factors exist in isolation. However, to our knowledge, **there has yet to be a data visualization that displays the burden of COPD and its risk factors all in one place.** 

- In addition, given the large amount of data available at the US county level for COPD and its corresponding risk factors, **we believe that linear regression based machine learning model (RandomForestRegression) or DeepLearning (using a Linear output function) could be deployed to predict the burden of COPD in US counties.** 


## Motivation 

COPD remains a threat to global public health and is the 4th leading cause of death in the United States. It has a negative impact on people's quality of life affecting daily activities and mental and emotional health. Therefore, we want to use the skills we learned from this bootcamp to create a model and visualization that can help predict the burden of COPD in US counties. Data visualizations and predict which COPD factors affect one's likelihood of developing COPD.

## Key Objectives

- Use machine learning to predict levels of COPD in US counties
- Create a heatmap that displays the burden of COPD in each county



## Data Cleaning and Processing
### Goals 
1. Obtain relevant data for use in data visualizations and machine learning models. 
2. Explore the data to determine what part of the data is relevant for our analysis. Remove irrelevant information.
3. Coordinate with team members on how to connect SQL dataframe/ML/website with our data 

### Accomplishments
1. All data have been cleaned and processed. They are now ready to be input into the database and incorporated into our machine learning models and data visualizations.

## Database
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

<img width="777" alt="Screen Shot 2022-11-23 at 7 46 19 PM" src="https://user-images.githubusercontent.com/107595127/203675856-2c580872-fb03-432f-b649-64ddcf3b737f.png">

### Database

Below is an image of what the Postgres database in PGAdmin looks like. 

<img width="1160" alt="Screen Shot 2022-11-06 at 12 05 37 PM" src="https://user-images.githubusercontent.com/107595127/200192519-d9aae5e5-34cd-4414-9d38-a720a0031b09.png">

### Jupyter Notebook
Below are examples from our Jupyter Notebook and how we connected our databse with Jupyter Notebook, along with examples of how we can push and pull information directly from our database. 

<img width="947" alt="Screen Shot 2022-11-06 at 12 09 37 PM" src="https://user-images.githubusercontent.com/107595127/200192746-a1eac2a6-c727-42b2-a7bb-820466d3c70d.png">

<img width="856" alt="Screen Shot 2022-11-23 at 8 11 45 PM" src="https://user-images.githubusercontent.com/107595127/203678802-c0ef9bef-7f28-4c63-b61a-038bd6d9dba9.png">


## Summary
Success! Our database and notebook are communicating without issues. There are definitely a few minor adjustments to be made and some details to be straightened out, but the platforms are communicating. This will allow us to create a model that reads information directly from our databse. We must still generate a way to push data from jupyter notebook into the database, but once that is done the two platforms could be used interchangeably. This step will allow us to incorporate additional data in the future by simply changing the names/file pathways we want our machine learning model to use. 
 

## Visualizations and Website
Goals: Creating map with pop-up feature containg data regarding COPD levels and associated risk factors in each county.

Accomplishments:
Creating map object, Added tile layers, Created & tested getColor function for heatmap Testing GeoJson Data file for mapping Pop-up feature testing.

Next Goals: Trying to apply to real GeoJson Data file and adding some feature

![1](https://github.com/AvatarJoshi/COPD_Project/blob/NewMaping-PS/COPD_Mapping/static/Images/County_line.png)


## Machine Learning
**Purpose:** To determine if machine learning is capable of predicting COPD levels based on our data we choose to start our analysis using RandomForestRegression and DeepLearning. We plan to connect the database directly to the notebooks where the machine learning algorithms will be run in the future. We have shown we can connect the database to a notebook and load data in [Connecting_JN.ipynb](Connecting_JN_SQL.pynb). For the time being, we have directly loaded data from processed .csv files we have created into the models.

### RandomForestRegression
For random forest regression we imported the PLACES dataset (which contains levels of current smokers and COPD per county) into our model. We used label encoder to encode string values and have preliminary results. 
![RandomForestRegression Actual vs Predicted](/Images/RandomForestRegressionScore.png)

### DeepLearning
For DeepLearning we imported all of our datasets and merged them into a master dataframe. This dataframe was encoded and run through our prelminary neural network. We used relU as our activation function for the input and hidden layers. Since this is a regression problem, we used 'linear' as the activation function for the output layer. The "mean squared error" was used to assess model performance. After 75 epochs we acheived an MSE of ~1.12. 
![DeepLearning](/Images/DeepLearningError.png)
