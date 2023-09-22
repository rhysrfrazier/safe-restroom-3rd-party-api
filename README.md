# Safe Restrooms 3rd-Party API
Public restrooms are the most wide-spread explicitly gendered spaces in the United States. Though recent years have seen an increase in single-stall unisex and family restrooms, the majority of public restrooms remain designated for "male" or "female" use. As a result, folx whose bodies and/or gender expressions fall outside of the perceived binary "norm" often find that they "stand out" more in public restrooms than in other less- or non-gendered spaces, often leading to increased rates of harrassment. In light of recent anti-trans legislation in the United States, many trans and GNC folx feel increasingly unsafe simply exercising a bodily function while doing errands, traveling, or spending time with family and friends in public settings.

The "old-school" way of finding safer establishments or unisex restrooms relied largely on word-of-mouth and trial and error; however, this method is not always be feasible. In order to spread information further in the community, [Refuge Restrooms](https://www.refugerestrooms.org/) has assembled an open-access database of public restrooms safe for use by trans and GNC folx. Many of the items in this database are the result of user submissions.
## Aim and Scope of this Project
This project aims to create a 3rd-party API interface that returns addresses of public restrooms safe for use by trans/GNC folx. Results will include whether the restroom is accessible by persons with disabilities, whether unisex restrooms are available, and whether baby changing stations are available.
## 
![mobile-version wireframe for the proposed project, showing user input and submission button and an instance of result "card" layout](https://github.com/rhysrfrazier/safe-restroom-3rd-party-api/assets/140181425/70b32f4b-bae2-4e30-a322-270bbec2a4a9)

## Anticipated Challenges
- I would like to show a minimum of 10 results per user query (where ten results are available). Making sure this section of code is concise will likely be challenging for me (but loops will be my friends).
- In order to keep the response cards clean and easy to read at a glance, I'd like to use checks and exes to indicate whether each result offers accessibility, unisex stalls, and changing stations. Formatting these in CSS and ensuring they can be read by screen-readers will be another challenge.
- Based on a test API call in Thunder Client, the returns will take some time to come in. As a stretch goal, I'd like to learn how to add a loading wheel.
