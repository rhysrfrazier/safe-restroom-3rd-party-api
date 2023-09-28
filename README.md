# Safe Restrooms 3rd-Party API
Public restrooms are the most wide-spread explicitly gendered spaces in the United States. Though recent years have seen an increase in single-stall unisex and family restrooms, the majority of public restrooms remain designated for "male" or "female" use. As a result, folx whose bodies and/or gender expressions fall outside of the perceived binary "norm" often find that they "stand out" more in public restrooms than in other less- or non-gendered spaces, often leading to increased rates of harrassment. In light of recent anti-trans legislation in the United States, many trans and GNC folx feel increasingly unsafe simply exercising a bodily function while doing errands, traveling, or spending time with family and friends in public settings.

The "old-school" way of finding safer establishments or unisex restrooms relied largely on word-of-mouth and trial and error; however, this method is not always be feasible. In order to spread information further in the community, [Refuge Restrooms](https://www.refugerestrooms.org/about) has assembled an open-access database of public restrooms safe for use by trans and GNC folx. Many of the items in this database are the result of user submissions.
## Aim and Scope of this Project
This project aims to create a 3rd-party API interface that returns addresses of public restrooms safe for use by trans/GNC folx. Results will include whether the restroom is accessible by persons with disabilities, whether unisex restrooms are available, and whether baby changing stations are available.
## 
![mobile-version wireframe for the proposed project, showing user input and submission button and an instance of result "card" layout](https://github.com/rhysrfrazier/safe-restroom-3rd-party-api/assets/140181425/42751c12-fb41-4170-b817-6d9099ea2971)

## Anticipated Challenges
Between the planning and execution stages of this project, these are the challenges I anticipated:
- I would like to show a minimum of 10 results per user query (where ten results are available). Making sure this section of code is concise will likely be challenging for me (but loops will be my friends).
- In order to keep the response cards clean and easy to read at a glance, I'd like to use checks and exes to indicate whether each result offers accessibility, unisex stalls, and changing stations. Formatting these in CSS and ensuring they can be read by screen-readers will be another challenge.
- The most direct way to search by city is via a call that searches for the terms throughout the ENTIRE contents of the API. This takes upwards of 10 seconds. It is much quicker to search via latitude and longitude, but most folx don't know their lat and long offhand. I have two options for stretch goals to address this: the first is to figure out how to generate a loading wheel so folks know not to spam the submit button; the second is to link an additional geolocation API and use the return from that inside the API call to refuge restrooms, so the results generate quicker (hopefully eliminating the need for the loading wheel).
- Additional stretch goal: redirecting to the google maps page for a given address when you click the card. 
## "Completed" Project
Between maintenance and possible improvements to be made, no project is every truly "finished" - there are always more things to add and improve, so it's just the point where you decide you can put it down and be satisfied. With my current skill level, I'm pretty proud of where this is as I'm setting it down and stepping back! The user can type in their city and state generate result cards that correspond closely to those provided in the wireframe, and click the cards to pull up a given location in Google maps. Here's a rundown of the goals met and extra functions added:
- **Cards Generated for All Available Results**
    - The function that runs to get results and create cards successfully makes a new card for every result. The loop that does this was actually much easier to get up and running than the function that actually creates the cards, which involves a lot of nesting children and parent elements to ensure styling compatibility. But the end result is a clean, organized card with key information on it.
- **Two Successful API Calls**
    - When the user hits "submit," two API calls are generated. The first is to a geolocation API, which is used to generate latitude and longitude variables. These variables are then passed through to the Refuge Restrooms API, whose call is configured to search by lat and long instead of just making a general search through everything. This drops the loading time by about a third - from 14(ish) seconds making a single call to Refuge Restrooms to about 5 making calls to both.
- **Loading Indicator**
  -  Five seconds is still a long time to wait after clicking a button, so a simple header that reads "loading Results..." is created right before the API calls, and deleted right after. It's basic, but it gets the job done.
- **Clickable Cards for Directions**
  - Each card includes a Google Maps link that will take the user to directions to the location (if Google Maps knows where the location is... more on that later). 
- **More Accessible Design**
  - I'm reluctant to make the blanket statement that the page is accessible without doing a full audit based on WCAG Standards. However, the project does achieve some key goals related to accessibility, including tested functionality with a screen reader, large buttons, dyslexia-friendly font, and basic, though not fully intuitive, functionality for keyboard users.  
- **Discreet Tab Title**
  - Admittedly, the tab will let anyone looking at the screen know that the user has to go to the bathroom, but it at least won't out them in a potentially unsafe setting.
## [Check out the page for yourself!](https://gotta_go.surge.sh/) 
<img width="715" alt="screenshot of project page, showing title, city and state input field, submit button, and more resources link" src="https://github.com/rhysrfrazier/safe-restroom-3rd-party-api/assets/140181425/9736d253-39d6-400f-ae94-fed3a399062f">
<img width="715" alt="Screenshot of project page showing first result cards for Crozet, Virginia" src="https://github.com/rhysrfrazier/safe-restroom-3rd-party-api/assets/140181425/562255e3-b43d-48c0-8aed-a6327d8987a9">

### Areas of Further Improvement
Now, for opportunities for improvement in future iterations:
- **Code Optimization**
  - Right now, this category is subject to a little bit of "I don't know what I don't know." I feel certain that the code can be more performant, and would like to keep making updates to it as I gain experience and improve my technical skills.
- **Accessibility Improvements**
  - The current project makes a start towards accessibility, but needs to be fully tested with WCAG criteria and (ideally) use-tested for different accessibility devices and needs.
- **Fine Tuning Card Clicks**
  - Because of the way the link is attached to the card to make everything screen-reader compatible, two click events will be created if the user clicks the place name within the card. This isn't the end of the world, but on my computer it tries to open both a new Google Maps tab and a new window, which the popup blocker catches. Clicking the name instead of the card itself may be an edge case, but it's a flaw I know is there so I'd like to get it ironed out anyway.
- **API Limitations**
  - A loading time of five seconds while the API calls are running is an improvement, but still quite a while. I'm not sure if anything else can be done about this, but speed is certainly an area for improvement.
  - There are also some imperfections based on the user-generated nature of the results in Refuge Restrooms' API. Some locations are duplicated, and it would be possible to filter out repeats of name and location in the function that creates the result cards. This becomes more tricky when the repeated locations don't have the exact same information, however. Very often, attributes like accessibility, availability of unisex stalls, and availability of changing stations may be marked as true in one entry, and false in another. In this case, the most recent entry may be more accurate, but there's no way to tell for sure. This is an issue that Refuge Restrooms is aware of and has an open ticket to try to resolve.
  - User generated names for locations may not be searchable on Google Maps. One test search included a result "public outdoor restroom," and the address given was simply the name of a certain local park. If the api object has latitude and longitude connected, using that as a fallback option to generate a google maps search may work (though searching latitude and longitude for a specific business in Google Maps, without the business' name, isn't percise enough to get to the right place)
  - Some locations have closed since being submitted by users. I'm unsure if there's a way for me to filter these results out (since that information isn't logged in the API), or if that's something that only the maintainers of the API could resolve.
##  Sources Consulted:
- <https://www.w3schools.com>
- <https://developer.mozilla.org>
- <https://inclusive-components.design/cards/>
