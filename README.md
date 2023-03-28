# COPD_Project

## Background

- Chronic-obstructive pulmonary disease (COPD) is a group of diseases that lead to airflow blockage and breathing-related problems. COPD represents a significant threat to public health in the United States. In 2018, there were estimated to be 156,045 deaths due to COPD making it the 4th overall leading cause of death. COPD is known to be caused by smoking, exposure to worksite pollutants, and genetic factors. In addition, new evidence suggests that prolonged exposure to air pollutants can also lead to COPD.

- Data visualizations for COPD and many of its corresponding risk factors exist in isolation. However, to our knowledge, **there has yet to be a data visualization that displays the burden of COPD and its risk factors all in one place.** 

- In addition, given the large amount of data available at the US county level for COPD and its corresponding risk factors, **we wanted to use machine learning to predict COPD levels and identify which risk factors are most associated with disease burden.** 


## Motivation 

COPD remains a threat to global public health and is the 4th leading cause of death in the United States. It has a negative impact on people's quality of life affecting daily activities and mental and emotional health. Therefore, we want to create a model and visualization that can help predict the burden of COPD in US counties.

## Key Objectives

- Create a heatmap that displays the burden of COPD in each county
- Use machine learning to predict levels of COPD in US counties

## Results 



## Machine Learning
**Purpose:** To determine if the health metrics in the CDC's dataset can be used to predict the burden of COPD. If so, we wished to determine which features are most important.

### RandomForestRegression
Since we are dealing with large amounts of continuous data with a variety of features, we choose the RandomForestRegression model to analyze our data. 

### Feature Importances


determine feature importances we used sklearn's 




## Heatmap
To visualize the burden of COPD in the US, Plotly.js was used to create an interactive heatmap using data from the PLACES dataset. Each county on the map can be clicked on so that the levels of smokers can be easily viewed. We also included data regarding the levels of smoking since this behavioral health metric was the most important feature in predicting COPD throughout the US.
![COPD_heatmap](/Images/copd_heatmap.png)