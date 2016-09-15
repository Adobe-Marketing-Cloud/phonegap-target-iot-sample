# Objective

This lab lesson shows you basic UI commands of Adobe Target, particularly in creating an Experience Targetting (XT) activity.

First of all, please send an email to *hackzuri@adobe.com* to obtain your login info. In your email please mention **team name** and **idea summary**. For any question, do not hesitate to contact Adobe crew at our booth.

To login to the Marketing Cloud, you will use the following information:
* **Your Marketing Cloud Login**. This will be of the format : hackzuri+xx@adobetest.com. The number after the dash (e.g. -01) will be different for each team.
* **Your Marketing Cloud Password**. This will be communicated individually via email.

## Lab 1: Adobe Target – a quick intro

In this exercise, you will familiarize yourself with Adobe Target's UI. You will log into the Adobe Marketing Cloud and access Adobe Target to view a list of activities. 

* Step 1: Browse to url for Adobe Marketing Cloud: https://hackzurich2016.marketing.adobe.com/content/mac/hackzurich2016/target/activities.html

* Step 2: Choose "Sign in with Adobe ID" blue button from the login page. If prompted for which account to use, select "Adobe ID/Personal account" and **NOT** "Enterprise ID/Company or school account".

* Step 3: Login using your Adobe ID. For example:  
Marketing Cloud Login: hackzuri+00@adobetest.com  
Password: ######

* Step 4: Click on the "Target" link on the left pane under "Solutions". After clicking the "Target" link you will see a "Target" card in the main pane. Please click the "Target" card to get into Target.

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab1_img1.png)

Adobe Target is where you will create the experiences to deliver to your various audiences.

## Lab 2: Hazard Viewer - Audiences

To create an audience, for example CH (), on the "Audiences" page:
* Step 1: Click on "+ Create Audience" button
* Step 2: Enter audience details as follow:  
Audience Name: CH  
Click on "+ Add Rule" as "Geo", evaluator "matches", then search for "switzerland"  

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab2_img1.png)

* Step 3: Save the audience. You should now see the new audience in the list.

We defined 4 audience types, based on the following configurations:
- CH: based on geolocation of web browser
- Scientist: identified by url query, e.g. [my_url]?type=scientist
![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab2_img2.png)
- Mobile: those visiting the site on mobile devices
![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab2_img3.png)
- Default: not belonging to any of the above categories. We use the "All Visitors" audience for this.

## Lab 3: Hazard Viewer - Content Offer

To create a targetted offer, on the "Content" page:
* Step 1: Click on "Create" button, select "HTML Offer"    
![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab3_img1.png)
* Step 2: Enter Offer Name and HTML Code for targetting:  
![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab3_img2.png)
* Step 3: Save the offer. You should now see the new offer in the list.

## Lab 4: Hazard Viewer - Experience Targetting (XT) Activity

* Step 1: Navigate to [https://hackzurich2016.marketing.adobe.com/content/mac/hackzurich2016/target/activities.html](https://hackzurich2016.marketing.adobe.com/content/mac/hackzurich2016/target/activities.html)

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab1_img1.png)

* Step 2: Click on Create Activity, and choose Experience Targeted 

![](http://adobe-marketing-cloud.github.io/target-iot-lab/lab-images/lesson2_img2.png)

* Step 3: In the New Activity window, choose Form based Activity

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img1.png)

* Step 4: Choose the hazardMbox from the drop down as shown for "LOCATION 1"

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img2.png)

* Step 5: Change the Default Content by clicking the triangle to the right and select "Change Offer"

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img3.png)

Select the CH_Watch_Offer which we created in Lab 3.

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img4.png)

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img5.png)

* Step 7: Click on the edit icon next to "All Visitors", and choose the audience CH 

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img6.png)

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img7.png)

* Step 8: Add the rest of the experiences as follows:

1. Scientist audiences --> Scientist_Hazard_Offer offer
1. Mobile --> Mobile_Hazard_Offer offer
1. All Visitors --> Default_Hazard_Offer offer

Click Next, you can review your audiences - experiences mapping. Make sure you name your activity as "Team XX - [team name]" before you save it !

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img8.png)

* Step 10: Click Next, and choose _Conversion_ as the primary goal, and action as _"Viewed an mbox"_ and _"** display mboxes **"_. Remember to "Save" your activity.

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img9.png)

* Step 11: You have now created an activity but it is currently inactive. Go back into your activity and click the "Activate" button to make it active.

![](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/lab-images/lab4_img10.png)

* Step 12: Go back to the web page to see the effect. As we are in Switzerland, you should be able to see the offer for CH. Congrats you set things up correctly!

* Step 13: You can try out the other active states and see the content change.
