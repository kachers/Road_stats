# Road_stats

## System Description
The system is designed for loading and viewing statistics of the number of cars and their average speed on a specific road section. The user wants to select records based on certain criteria. In a separate section, the user wants to view the average speed of cars in a cross-section of one day in the form of a graph.

## Functional Requirements
+ The system should be able to load statistics data for a month. The initial data is provided in a file ('speed.txt') for one month, including date, speed, and car registration number, separated by a TAB character. Data loading into the system can be provided either through a separate console app or via a Web UI, at the author's discretion.
+ In a separate section/page, the system user should be able to select statistics data, which includes displaying the date, speed, and car registration number in a tabular form.
+ The data should be filterable based on the following criteria:
Speed (select records equal to or greater than the specified value).
Date from (select all records starting from the specified date).
Date to (select all records up to the specified date, inclusive).
Any filter can also be left unspecified, meaning all filters can be left blank.
At most 20 rows should be displayed at once.
+ The system user should be able to choose a specific day of the month to display data. The system should display an average speed graph by the hour for that day (the graph should have 24 values).
## Non-Functional Requirements
+ Technologies used:
  + ASP.NET Core.
  + TypeScript (preferred).
  + Other technologies at the author's discretion.
  + EntityFramework Code-first (preferred, but if another method is used, an explanation is required) for storing loaded data.
+ In the root directory of the solution, create a Readme.md (markdown) file that includes:
  + Author's name and surname.
  + A brief setup/launching instruction for the solution.
  + Problems encountered during the execution of the task (if any).
  + Description of potential future improvements (if any).
  + Any additional comments.
+ The solution should be delivered as a ZIP (7z) archive, including:
  + All source code (solution).
  + An uncompiled solution ready for execution.
  + Other necessary data for running the solution (e.g., DB, SQL scripts if required, and other data).
  + A screenshot from a working system.
## Evaluation Criteria
+ Compliance of the solution with the specified requirements.
+ Performance of the solution.
+ [Secondary] Modularity, code structure, and coding style of the solution.
+ [Minor] User-friendliness of the system's UI and UI design.
+ Expected solution completion time: 1-2 hours. The use of code notebooks and templates is allowed.




