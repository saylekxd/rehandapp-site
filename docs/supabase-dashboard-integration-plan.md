# Dashboard Integration Plan (removed)

## Overview
This document has been archived. The repository now contains only a static landing page without Supabase.

## Current State
- Supabase project is set up with tables for tasks, users, businesses, and various task-related entities
- NextJS dashboard is implemented with mock data
- Authentication is already integrated with Supabase (you can alwasy check it through MCP (Model Context Protocol inside .cursor folder))

## Left Sidebar Navigation Structure
- Dashboard (Overview)
- Tasks
  - All Tasks
  - My Tasks
  - Completed
  - Templates
- Documents
  - All Documents
  - Create Document
- Team
  - Team Members
  - Work Sessions
- Settings
  - Profile
  - Business Settings
  - Tags Management

## Business Context Filtering
All data fetching will implement business context filtering to ensure users only see data related to their assigned business:

## Data Integration Strategy

### Day 1: Core Data Fetching and Dashboard Overview

#### 1. Dashboard Overview Page Integration
- [X] Replace mock stats with real-time data from Supabase _(Sidebar: Dashboard)_
- [X] Connect to the following tables:
  - `tasks` - To show task counts and statuses
  - `users` - To display user information
  - `businesses` - For business context

#### 2. Recent Activity Feed
- [X] Implement a real-time feed of recent activities _(Sidebar: Dashboard)_
- [X] Pull data from task_comments, task_photos, and tasks tables
- [X] Add proper filtering by business_id and user permissions

### Day 2: Task Management and User Features

#### 1. Task List and Details
- [ ] Create task list view with filtering and sorting _(Sidebar: Tasks > All Tasks)_
- [ ] Implement task details view with data from related tables _(Sidebar: Tasks > [taskId])_:
  - task_checklist_items
  - task_comments
  - task_photos
  - task_tags
- [ ] Create "My Tasks" view with assigned_to filter _(Sidebar: Tasks > My Tasks)_
- [ ] Create "Completed" view with completed filter _(Sidebar: Tasks > Completed)_

#### 2. User Management
- [ ] Implement user list with role-based visibility _(Sidebar: Team > Team Members)_
- [ ] Add user profile data connection _(Sidebar: Team > [userId])_
- [ ] Set up proper role-based access control (RBAC) _(Sidebar: Settings > Profile)_
- [ ] Implement work sessions tracking _(Sidebar: Team > Work Sessions)_

#### 3. Analytics Dashboard
- [ ] Create data visualizations from task_performance and user_daily_stats _(Sidebar: Dashboard)_
- [ ] Implement work session analytics from work_sessions table _(Sidebar: Team > Work Sessions)_
- [ ] Add user productivity metrics _(Sidebar: Dashboard)_

### Day 3: Advanced Features and Optimization

#### 1. Task Templates and Recurring Tasks
- [ ] Connect task_templates table to enable template creation _(Sidebar: Tasks > Templates)_
- [ ] Implement recurring task scheduling UI _(Sidebar: Tasks > Templates)_
- [ ] Add task creation from templates _(Sidebar: Tasks > All Tasks)_

#### 2. Tagging System
- [ ] Implement tag management interface _(Sidebar: Settings > Tags Management)_
- [ ] Add filtering by tags across the application _(Sidebar: Tasks > All Tasks)_
- [ ] Connect task_tags table with tasks _(Multiple sidebar locations)_

#### 3. Document Management
- [ ] Create document list view _(Sidebar: Documents > All Documents)_
- [ ] Implement document creation interface _(Sidebar: Documents > Create Document)_
- [ ] Add document details view _(Sidebar: Documents > [documentId])_

#### 4. Performance Optimization
- [ ] Implement proper data caching _(All sidebar sections)_
- [ ] Add pagination for large data sets _(Tasks, Documents, Team sections)_
- [ ] Optimize real-time subscriptions _(All sidebar sections)_

#### 5. Final Testing and Deployment
- [ ] Test all data connections
- [ ] Verify role-based access control
- [ ] Deploy the integrated dashboard

## Database Tables to UI Mapping

### Dashboard Overview
- **Stats Cards**: tasks, user_daily_stats
- **Recent Activity**: tasks, task_comments, task_photos
- **User Performance**: task_performance, user_daily_stats

### Tasks Section
- **Task List**: tasks, task_tags
- **Task Details**: tasks, task_checklist_items, task_comments, task_photos
- **Task Creation**: tasks, task_templates

### User Management
- **User List**: users
- **User Profiles**: users, user_daily_stats
- **Work Sessions**: work_sessions

### Documents Section
- **Document List**: documents (TBD - may need to create this table)
- **Document Details**: documents, document_versions (TBD)

### Analytics
- **Task Performance**: task_performance
- **User Productivity**: user_daily_stats, work_sessions
- **Business Metrics**: tasks, users, businesses

## Technical Implementation Notes

### Archived

### State Management
1. Use React hooks and context for local state
2. Implement proper loading and error states
3. Add optimistic UI updates for better UX

### Authentication and Business Context Integration
1. Leverage existing Supabase auth
2. Implement proper role checks (admin, manager, worker)
3. Apply row-level security based on user context
4. Ensure all data queries are filtered by business_id
5. Create middleware to verify business association



## Conclusion
This plan provides a structured approach to integrating the Supabase database with the NextJS dashboard within a 3-day timeframe. By following this plan, we will replace the mock data with real-time data from Supabase, implement proper data fetching strategies, and ensure the dashboard is performant and secure with proper business context filtering throughout. 