A small demo project to demonstrate the use of Express and Vue. Note that data is mock data, so no database interaction.
The app is for ticket workflow. It does not contain alle features, that could be relevant (e.g. edit and delete).

Some features include:
- Status values and actions are defined backend - but loaded on the client for reuse.
- Workflow, i.e. status changes, are defined in the actions definition file, i.e. current and next status for an action.
- Permissions to perform actions depend on user role. When loading tickets, the allowed actions are specified in an "actions" field on each ticket. 
Permissions to perform the action is also checked when executing the action.
- Added or modified tickets are emitted to other users. Here it is also checked which users are allowed to get the ticket.
- Users with different roles have different menu entries and a minor dashboard view below the menu is also only relevant to some user roles.
