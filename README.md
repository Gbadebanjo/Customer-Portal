
# Customer Portal

## Tasks
- button          - DONE
- import fonts   - DONE 
- forgot Password  - DONE
- login         - DONE
- icons from heroicons.com        - DONE
- favicon       - DONE
- 403 screen        - DONE
- Login screen clean up       - DONE
- My profile       - DONE
- work on top-center and content background          - DONE
- Add icons to nav bar component        - DONE
- Make menu color orange when its the active screen name (105)        - DONE
- make menus clickable        - DONE
- Sequelize        - DONE
- associations        - DONE
- set up seeders for eg roles, supportQueryCategories  to run on start up        - DONE
- React tables      - DONE
- Styling         - DONE
- Various screen read tables views        - DONE
- text template seeding        - DONE
- fetch Support query categories display        - DONE
- getSupport by id        - DONE
- get customer by id        - DONE
- get userby id      - DONE
- getCategory  by id        - DONE
- front end CRUD actions for customer        - DONE
- front end CRUD actions for user      - DONE
- front end CRUD actions for report        - DONE
- front end CRUD actions for planned data upload        - DONE
- modal inserts        - DONE
- modify modals      - DONE 
- textTemplate Popup    - DONE
- Edit Text Templates    - DONE
- create modal pop up screens for creates      - DONE
- create modal pop up screens for edits     - DONE
- create user modal validations     - DONE
- pagination     - DONE
- search features    - DONE
- API integration     - DONE
- wrong Power supplied from grid     - DONE
- left and right frames must be static and not scroll
- Dashboard AssetsComponents grid design     - DONE
- add users  to the right customer array     - DONE
- api implementation    - DONE
- use ChartJs for dashboard    - DONE
- user search failing     - DONE
- export users        - DONE
- select a day to view
- Lucia auth features         - DONE
- register         - DONE
- login         - DONE
- validate         - DONE
- auth protect pages          - DONE
- auth login flow          - DONE
- log out          - DONE
- uploading          - DONE
- put user name in Nav bar          - DONE
- docker          - DONE
- push code to a separate branch called   step-in-dev branch  -DONE
- Screen functionalities -Support - ResolveSupportTicket function   -DONE
- email sending
- allow email sending
- import users -debug
- Screen functionalities -SupportDetails Screen
- Screen functionalities -planned vs actual
- planned data uploads
- planned vs actuals
- planned data uploads
- planned vs actuals
- nav bar scroll
- custom date search
- account/manage(right side pop up)
- page drop down
- user impersonation /host urls

- permission matrix and functionality
- permissions for user roles
- Audit Logs
- Security Logs
- advanced filters
- Settings Screen

- security logs implementation
- audit logs implementation-  
- kubernetes
- deployment
- sign up email sending
- Make responsive
- login  -click to show placeholder above entered text     - DONE

## Entities
Here's a list of all the models modified in the responses from this thread:
    UserRole
    AuditLog
    Customer
    PowerProductionPlan
    PowerProductionPlanItem
    Report
    SecurityLogs
    SiteDetail
    SupportQuery
    SupportQueryCategory
    SupportQueryMessage
    SupportQueryStatus
    User
    UserSessions

## pending
extract all users from users table in prod
extract all customers from customers table in prod
extract all support from support table in prod

## First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000]


## Issues


## parts
- DB - 5432

## on fresh db installation
1. run migration
2. run seeders
3. update config file in .env
/database/config/config.mjs

## commands - first time
- update ".env" OR " "database/config/config.mjs"  with postgres db connection credentials
- npm run migrate
- npm run seed (run only once)
- npm run dev

## ALTERNATIVELY (- USING SEQUELIZE CLI Directly)
- npm run migrate | OR | npx sequelize-cli db:migrate
- npm run seed | OR | npx sequelize-cli db:seed:all (run only once)
- npm run dev

## Undo migration
npm run migrate:rollback:all | OR | npx sequelize-cli db:migrate:undo:all

## to create migrations and seeders
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli model:generate --name UserSession --attributes id:string,expires_at:date,user_id:string

generates both model and migration

npx sequelize-cli seed:generate --name text_templates   
generates both model and seed

## subsequently 
- npm run dev

## validations
validations in the CreateSupportModal component. Here they are:

## dev test 
### user
idt-servicedesk@daystar-power.com
### pass
daystarDev@2024

### user
daystardev@daystar-power.com

### pass
daystarDev@2024


