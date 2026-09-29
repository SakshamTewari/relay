# Relay

A real-time collaboration platform built for team communication and knowledge sharing, with workspaces, channels, messaging, and AI-powered workspace assistance.


## Tech Stack

### Backend

* TypeScript
* Node.js
* Fastify

### Planned Infrastructure

* PostgreSQL
* Redis
* Kafka
* WebSockets
* Docker
* Kubernetes
* Prometheus
* Grafana

## Architecture

Relay follows a layered backend architecture:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Data Store
```

Supporting components include:

* Configuration
* Schemas
* Types
* Plugins
* Composition

Infrastructure-specific implementations are kept separate from application logic to reduce coupling and make individual components easier to replace or extend.

## Current Features

### Authentication

* User registration
* User login
* Password hashing
* JWT access tokens
* JWT refresh tokens
* Authentication middleware

### Collaboration

* Workspaces
* Workspace members
* Channels
* Messages
* Workspace and channel relationships
* Message pagination

### Workspace Assistant

Relay is being extended with an AI-powered workspace assistant.

The current flow is:

```text
User
  ↓
Assistant API
  ↓
AssistantService
  ↓
WorkspaceContextService
  ↓
Workspace / Channel / Message data
  ↓
LLMService
  ↓
OpenAI
```

The assistant can use workspace conversation data as context when generating responses.

The AI architecture is provider-independent:

```text
LLMService
    ↑
    |
OpenAIService
```

The application depends on the `LLMService` abstraction rather than directly coupling the assistant to a specific LLM provider.

## Planned Features

The project will be developed incrementally.

### Backend & Distributed Systems

* PostgreSQL persistence
* Redis caching
* Kafka and event-driven architecture
* Background jobs
* Rate limiting
* WebSockets and real-time events
* Notifications
* File and attachment handling
* Search
* Audit logging
* Metrics and observability

### AI

The workspace assistant will gradually evolve from a basic LLM integration into a more capable AI system.

Planned areas include:

* LLM fundamentals
* Embeddings
* Vector search
* Vector databases
* Retrieval-Augmented Generation (RAG)
* Conversation history
* Tool calling
* Agents
* Streaming responses
* AI-specific caching and rate limiting
* Token and cost tracking
* Prompt management
* AI evaluation
* Observability

### Web3

After the core collaboration and distributed-system components are developed, Relay will explore Web3 functionality such as:

* Wallet-based authentication
* Decentralized identity
* Blockchain-integrated permissions
* Web3-native collaboration features

## Repository Structure

```text
src/
├── config/
├── controllers/
├── infrastructure/
├── models/
├── plugins/
├── repositories/
├── routes/
├── schemas/
├── services/
├── types/
└── composition/
```



