# User Guide for NodeBB Implementations by ratRamen

## Accepted Answer
How to use and test: 
- create a clean build of NodeBB
- create a student account
- go to general discussion and create a new topic
- create another student account
- go to general discussion and post a reply to the asked question
- log back in to the original student account
- there should be an accept button next to the second student's reply. Click the button and refresh
- there should be a checkmark next to the accept button.

Link to tests: [pull request](https://github.com/CMU-313/spring24-nodebb-ratramen/pull/35)
Description of how tests function: these tests basically execute an acceptance and an unacceptance, and returns values from the relevant functions.

\* note that some of our team members had this feature working on their copy of NodeBB and others did not despite everyone being up to date with the lastest version of the main branch, thus I will include a video demo of this feature here: [video](https://drive.google.com/file/d/1iYHY8DLewNLkDQfJBJTdE6avntl9eZwJ/view?usp=sharing)

## Post Pinning
How to use and test:
- create a clean build of NodeBB
- go to general discussion and create a new topic
- sign out and login with a instructor account (Note: users that made post can't pin their own post)
- press 'pin' and refresh

Link to tests: [pull request](https://github.com/CMU-313/spring24-nodebb-ratramen/pull/27)
- Or view on lines 713 - 728 to test>categories.js
Description of how tests function: verify if different types of users have the correct privileges for pinning
posts.

[video](https://drive.google.com/file/d/1ZGQxjnLyTpzw33Cptg2huiSnxNmnTAfr/view?usp=sharing)