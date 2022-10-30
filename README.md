# COPD_Project

## Background

**Describe the idea and how it’s a valid idea**

- Chronic-obstructive pulmonary disease (COPD) is a group of diseases that lead to airflow blockage and breathing-related problems. COPD represents a significant threat to public health in the United States (1). In 2018, there were estimated to be 156,045 deaths due to COPD making it the 4th overall leading cause of death (2). COPD is known to be caused by smoking, exposure to worksite pollutants, and genetic factors. In addition, new evidence suggests that prolonged exposure to air pollutants can also lead to COPD (3).

- Data visualizations for COPD and many of its corresponding risk factors exist in isolation. However, to our knowledge, there has yet to be a data visualization that displays the burden of COPD and its risk factors all in one place. 

- In addition, given the large amount of data available at the US county level for COPD and its corresponding risk factors, **we believe that linear regression based machine learning model (RandomForestRegression or XGBoost Regressor) or DeepLearning (using Linear output function) could be deployed to predict the burden of COPD in US counties.** 


## Motivation 

COPD remains a threat to global public health and is the 4th leading cause of death in the United States. It has a negative impact on people's quality of life affecting daily activities and mental and emotional health. Therefore, we want to use the skills we learned from this bootcamp to create a model and visualization that can help predict the burden of COPD in US counties. 

## Questions to Answer

- Which States / US Counties have the highest levels of COPD?
- Which behavioral or environmental factors are most predictive for COPD? Smoking, air quality, worksite exposure (coal mines)?
- Which demographic factors are most predictive for COPD?
Male vs female, age, rural vs urban, race


## Data Cleaning and Processing
### Goals 
1. Obtain relevant data for use in data visualizations and machine learning models. 
2. Explore the data to determine what part of the data is relevant for our analysis. Remove irrelevant information.
3. Coordinate with team members on how to connect SQL dataframe/ML/website with our data 

### Accomplishments
1. I believe we have all of the datasets we need
2. I have begun cleaning the data. The coal and PLACES datasets are completed. This week I will continue to work on AirQuality and Census data. 

## Database
Goals: Interface database with website
Accomplishments: Created tables and schema for the project.
 

## Visualizations and Website
Goals:
    Creating map with pop-up feature

Accomplishments:    
    Creating map object
    Adding tile layer
    Creating & testing getColor function for heatmap
    Testing GeoJson Data file for mapping 
    Pop-up feature testing
    
Next Goals:
    Trying to apply to real GeoJson Data file and adding some feature
   
## Machine Learning

