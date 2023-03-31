# COPD_Project

## Background

- Chronic-obstructive pulmonary disease (COPD) is a group of diseases that lead to airflow blockage and breathing-related problems. COPD represents a significant threat to public health in the United States. In 2018, there were estimated to be 156,045 deaths due to COPD making it the 4th overall leading cause of death in the United States. COPD is known to be caused by smoking, exposure to worksite pollutants, and genetic factors. In addition, new evidence suggests that prolonged exposure to air pollutants can also exacerbate COPD.

- The CDC's PLACES initative has provided a wealth of information regarding the burden of diseases, such as COPD. In addition, it monitors a variety of health-associated metrics including health risk behaviors, the physical and mental health statuses of individuals, and preventive services in each area.

- **Understanding the burden and geographical distribution of health measures can aid local government agencies in planning targeted public health interventions.**

### Key Objectives
- Thus, this project aims to accomplish the following:
    
    1.  Use the PLACES dataset to create a machine learning model that predicts the levels of COPD based on the health metrics in the dataset.
    
    2. Identify the health metrics most important for the model's performance.
    
    3. Generate a map that shows the geographic distribution of COPD along with the health metric(s) most predictive of COPD abundance.

    4. Use the results to make suggestions on what type of intervention strategies might be most impactful on curbing COPD. 

---

## Motivation 

COPD remains a threat to global public health and is the 4th leading cause of death in the United States. It has a negative impact on people's quality of life affecting daily activities and their mental and emotional health. Therefore, we want to create a model and visualization that can help local authorities plan preventative interventions to curb COPD across the US.

---

## Resources
[ML_Analysis.ipynb](ML_Analysis.ipynb) - Notebook that uses the Sci-kit Learn library to create ML models. Currently, it compares Linear Regression and RandomForestRegression. **This notebook uses COPD as the target for the model. However, the code is flexible and can easily be modified to assess other disease such as cancer, diabetes, depression, etc.

[COPD_Mapping](COPD_mapping) - Folder that contains all the static files and index.html to create the map. Please note that the files used to create the state lines, county lines, and COPD-associated data are located in zipped files in the data folder.

---

## Machine Learning
**Purpose:** To determine if the health metrics in the CDC's dataset can be used to predict the burden of COPD. If so, we wished to determine which features are most important.

### Linear Regression


### RandomForestRegression
Since we are dealing with large amounts of continuous data with a variety of features, we choose the RandomForestRegression model to analyze our data. The Root Mean Squared Error (RMSE) for our model was 0.26239737222842185, indicating that on average the model's predictions were close to the actual values.


determine feature importances we used sklearn's 




### COPD Heatmap
To visualize the burden of COPD in the US, Plotly.js was used to create an interactive heatmap using data from the PLACES dataset. Each county on the map can be clicked on so that the levels of smokers can be easily viewed. We also included data regarding the levels of smoking since this behavioral health metric was the most important feature in predicting COPD throughout the US.
![COPD_heatmap](/Images/copd_heatmap.png)