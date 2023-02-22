# COPD_Project

## Background

- Chronic-obstructive pulmonary disease (COPD) is a group of diseases that lead to airflow blockage and breathing-related problems. COPD represents a significant threat to public health in the United States. In 2018, there were estimated to be 156,045 deaths due to COPD making it the 4th overall leading cause of death. COPD is known to be caused by smoking, exposure to worksite pollutants, and genetic factors. In addition, new evidence suggests that prolonged exposure to air pollutants can also lead to COPD.

- Data visualizations for COPD and many of its corresponding risk factors exist in isolation. However, to our knowledge, **there has yet to be a data visualization that displays the burden of COPD and its risk factors all in one place.** 

- In addition, given the large amount of data available at the US county level for COPD and its corresponding risk factors, **we believe that linear regression based machine learning model (RandomForestRegression) or DeepLearning (using a Linear output function) could be deployed to predict the burden of COPD in US counties.** 


## Motivation 

COPD remains a threat to global public health and is the 4th leading cause of death in the United States. It has a negative impact on people's quality of life affecting daily activities and mental and emotional health. Therefore, we want to use the skills we learned from this bootcamp to create a model and visualization that can help predict the burden of COPD in US counties.

## Key Objectives

- Create a heatmap that displays the burden of COPD in each county
- Use machine learning to predict levels of COPD in US counties

## Results 

## Heatmap
To visualize the burden of COPD in the US, Plotly.js was used to create an interactive heatmap using data from the PLACES dataset.
![COPD_heatmap](/Images/copd_heatmap.png)

## Machine Learning
**Purpose:** To determine if machine learning is capable of predicting COPD levels based on our data we choose to start our analysis using RandomForestRegression and DeepLearning. 

### RandomForestRegression
For random forest regression we imported the PLACES dataset (which contains levels of current smokers and levels COPD per county) into our model. 
![RandomForestRegression Actual vs Predicted](/Images/RandomForestRegressionScore.png)

### DeepLearning
For DeepLearning we imported all of our datasets and merged them into a master dataframe. This dataframe was encoded and run through our prelminary neural network. We used relU as our activation function for the input and hidden layers. Since this is a regression problem, we used 'linear' as the activation function for the output layer. The "mean squared error" was used to assess model performance. After 75 epochs we acheived an MSE of ~1.12. 
![DeepLearning](/Images/DeepLearningError.png)
