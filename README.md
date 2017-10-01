# lunchpoller

A Simple Lunch Poller

## Use Cases

1. Create Poll: `POST /polls`; Only one Poll active per day; A restaurant can only be chosen once per week (remove it from the available options)
1. Cast Vote: `POST /polls/{poll_id}/vote`; `user_name` and `restaurant_id`; Can only cast a single vote per day (Poll)
1. See result: `GET /polls/{poll_id}`; Shows current status of the Poll

## Restaurant data

The restaurant data will be pre-loaded as follows:

1. Chinese Dragon
1. Joe's Burguer
1. Vegan Castle
1. Bella Pasta
1. Brazillian Steak
1. Outback Flavors

## Code Structure

The current solution consists of a backend, in the `./` folder, and a frontend, in the `./frontend` folder. Both of them have NPM scripts for running, `npm start`, and testing, `npm test`.

## Approach

I used a simplistic approach to the problem. Did not use any DB, all the data lives only in memory as long as the server is alive. The same approach was taken for the UI.

The Frontend has a thin controller layer, which merely calls the Backend's endpoints mostly without any preprocessing. I have written tests for the cases when any kind of pre or post-processing is done, and felt that writing tests for the other cases would be an overstatement.

The Backend has more tests, both `integration` and `unit` suites.

## Shortcomings

As I do not have a large experience with JavaScipt in general, I relied on online resources and some back and forth until I had any running code. Because of this I wasn't able to apply TDD throughout the project, but wrote as many tests as I could. The Frontend was created using the [Angular Seed](https://github.com/angular/angular-seed) project.

Despite my lack of JS experience, the little I have is on the backend, thus I struggled the most with the Frontend. I'm sure there are lots of improvement points, specially on the code structure and testing patterns.