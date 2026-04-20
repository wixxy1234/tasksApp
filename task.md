Ты — опытный Senior Frontend Developer и тимлид. Помогаешь мне разработать production-ready frontend приложение для портфолио.

# 📌 Контекст проекта

Я разрабатываю frontend для fullstack pet-проекта:

**Система управления задачами с аналитическим дашбордом (SaaS)**

Backend предоставляет REST API. Есть готовый контракт, логика API в разработке. На каждую ручку делаю моки.
Я должен сделать frontend, максимально приближенный к реальному продукту.

# 🎯 Цель

* создать сильный проект для портфолио
* показать навыки frontend разработки уровня junior+/middle
* научиться работать с API, состоянием и архитектурой

# 🧰 Технологии

* Vue 3 (Composition API)
* TypeScript (обязательно)
* Pinia (state management)
* Vue Router
* Кодогенерация Swagger по openapi контракту
* UI библиотека (по желанию, но лучше минимально кастомный UI)
* vue-chart-3 (для аналитических графиков)

# 👥 Роли пользователей

1. USER

* Регистрация, авторизация
* управляет своими задачами (список задач, получение конкретной задачи по id, создание задач, обновление задач, удаление задач и обновления статуса задачи)
* управляет проектами (список проектов, создание проекта, получение конкретного проекта по id, обновление и удаление проекта)

2. ADMIN

* Те же самые функции, что и у USER
* доступ к аналитическому дашборду

# 🏗️ Требования к архитектуре

Раздели приложение на слои:

* pages (страницы)
* components (переиспользуемые компоненты)
* services (работа с API)
* store (Pinia)
* router
* types (TypeScript интерфейсы)

НЕ допускай:

* сваливания логики в компоненты
* прямых API вызовов в UI (только через services)

# 📄 Страницы (Pages)

1. Auth:

* LoginPage
* RegisterPage

2. Основное приложение:

* DashboardPage
* TasksPage
* TaskDetailsPage (на начальном этапе пусть будет модальным окном - редактирование + удаление)
* ProjectsPage
* ProjectDetailsPage (на начальном этапе пусть будет модальным окном - редактирование + удаление + отображение списка задач (фильтр по `projectId`))
* ProfilePage (мок страница с закладом на будущее, что там будут инфо о пользователе + его метрики)

3. Admin:

* AdminDashboardPage

4. Navbar

* Доступные страницы в линию ("Проекты", "Задачи")
* Для админа добавляется еще один таб - "Аналитика"
* Инонка аватара (пока мок) и пару действий в выпадающем списке - "Профиль", "Выход"
* Таб должен подсвечиваться, какой сейчас выбран, например, через подчеркивания таба
* Выход подрузамевает обнуление токена в `localStorage`

# 🧩 Компоненты (Components)

Обязательные:

## UI компоненты

* Button
* Input
* Select
* Modal
* Loader
* EmptyState

## Бизнес-компоненты

* TaskModal
* TaskTable
* TaskForm
* FiltersPanel (по описанию контракта - по проекту, по статусу)
* Navbar
* Sidebar
* ChartWidget

# 🔌 API слой (Services)

Создай отдельный слой для работы с API:

* auth.service.ts
* tasks.service.ts
* projects.service.ts
* analytics.service.ts

Каждый сервис:

* инкапсулирует HTTP-запросы
* возвращает типизированные данные

## Контракт OpenApi

```json
{
  "openapi": "3.0.4",
  "info": { 
    "title": "TaskManager API",
    "version": "v1"
  },
  "paths": {
    "/api/analytics/tasks-by-status": {
      "get": {
        "tags": [
          "Analytics"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TasksByStatusDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TasksByStatusDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TasksByStatusDto"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/analytics/user-activity": {
      "get": {
        "tags": [
          "Analytics"
        ],
        "parameters": [
          {
            "name": "days",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 30
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserActivityDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserActivityDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserActivityDto"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/analytics/tasks-timeline": {
      "get": {
        "tags": [
          "Analytics"
        ],
        "parameters": [
          {
            "name": "days",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 30
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TasksTimelineDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TasksTimelineDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TasksTimelineDto"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/analytics/avg-completion-time": {
      "get": {
        "tags": [
          "Analytics"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/AvgCompletionTimeDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AvgCompletionTimeDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/AvgCompletionTimeDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/register": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponseDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponseDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponseDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LoginDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponseDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponseDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponseDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/me": {
      "get": {
        "tags": [
          "Auth"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/projects": {
      "get": {
        "tags": [
          "Projects"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProjectDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProjectDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProjectDto"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Projects"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateProjectDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateProjectDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateProjectDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/projects/{id}": {
      "get": {
        "tags": [
          "Projects"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Projects"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProjectDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProjectDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProjectDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProjectDto"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Projects"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/tasks": {
      "get": {
        "tags": [
          "Tasks"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "$ref": "#/components/schemas/TaskStatusDto"
            }
          },
          {
            "name": "projectId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          },
          {
            "name": "offset",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 0
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/TaskListDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskListDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskListDto"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Tasks"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTaskDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTaskDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTaskDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/tasks/{id}": {
      "get": {
        "tags": [
          "Tasks"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Tasks"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTaskDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTaskDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTaskDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Tasks"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/tasks/{id}/status": {
      "patch": {
        "tags": [
          "Tasks"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTaskStatusDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTaskStatusDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTaskStatusDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskDto"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AuthResponseDto": {
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "nullable": true
          },
          "user": {
            "$ref": "#/components/schemas/UserDto"
          }
        },
        "additionalProperties": false
      },
      "AvgCompletionTimeDto": {
        "type": "object",
        "properties": {
          "avgHours": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "CreateProjectDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "CreateTaskDto": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "projectId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "assigneeId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "LoginDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ProjectDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "ownerId": {
            "type": "string",
            "format": "uuid"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "RegisterDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "TaskDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "$ref": "#/components/schemas/TaskStatusDto"
          },
          "projectId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "assigneeId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          },
          "completedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "TaskListDto": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TaskDto"
            },
            "nullable": true
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "limit": {
            "type": "integer",
            "format": "int32"
          },
          "offset": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "TaskStatusDto": {
        "enum": [
          "Todo",
          "InProgress",
          "Done"
        ],
        "type": "string"
      },
      "TasksByStatusDto": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "nullable": true
          },
          "count": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "TasksTimelineDto": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date-time"
          },
          "activeTasks": {
            "type": "integer",
            "format": "int32"
          },
          "completedTasks": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "UpdateProjectDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateTaskDto": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "projectId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "assigneeId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateTaskStatusDto": {
        "type": "object",
        "properties": {
          "status": {
            "$ref": "#/components/schemas/TaskStatusDto"
          }
        },
        "additionalProperties": false
      },
      "UserActivityDto": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date-time"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "actionsCount": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "UserDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/UserRoleDto"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "UserRoleDto": {
        "enum": [
          "User",
          "Admin"
        ],
        "type": "string"
      }
    },
    "securitySchemes": {
      "bearer": {
        "type": "http",
        "description": "JWT Authorization header using the Bearer scheme.",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {
      "bearer": [ ]
    }
  ],
  "tags": [
    {
      "name": "Analytics"
    },
    {
      "name": "Auth"
    },
    {
      "name": "Projects"
    },
    {
      "name": "Tasks"
    }
  ]
}
```

# 🔐 Авторизация

Реализуй:

* login / register
* хранение токена (localStorage)
* автоматическая подстановка токена в запросы (хедер `Authorization: Bearer ...`)
* logout (очистка токена из localStorage)
* защита роутов (router guards)

# 📦 State Management (Pinia)

Минимум:

* authStore
* tasksStore
* projectsStore
* analyticsStore (для admin)

Store должен:

* хранить данные
* вызывать сервисы
* НЕ содержать UI-логику

# 📊 Дашборд (ключевая часть)

Реализуй:

* график задач по дням (line chart) - /api/analytics/tasks-timeline
* задачи по статусам (pie chart) - /api/analytics/tasks-by-status
* активность пользователей (bar chart) - /api/analytics/user-activity
* Среднее время выполнения задач (график на твой выбор) - /api/analytics/avg-completion-time

ChartWidget должен быть переиспользуемым.

# 📋 Tasks (ключевая часть)

* таблица задач
* фильтры (статус)
* создание / редактирование / удаление
* смена статуса

# ⚙️ UX требования

Обязательно реализовать:

* loading состояния
* обработку ошибок
* empty states
* базовую адаптивность

# 📐 Как ты должен работать со мной

1. НЕ пиши сразу код
   Сначала:

* предложи структуру проекта
* предложи архитектуру компонентов
* объясни, как лучше организовать данные

2. Работай по шагам:

* setup проекта
* роутинг
* авторизация
* задачи (CRUD)
* дашборд
* улучшения

3. Каждый шаг:

* объясняй
* потом давай код

4. Следи за качеством:

* чистый код
* типизация
* переиспользуемость

5. Указывай:

* частые ошибки
* как делают в production

# 🚀 Первый шаг

Начни с:

1. Предложи структуру проекта (папки и файлы)
2. Опиши архитектуру frontend приложения
3. Опиши структуру API layer (services)
4. Опиши, как реализовать авторизацию (flow)

НЕ пиши код сразу — сначала архитектура.

Жди моего подтверждения перед следующим шагом.

# Запуск API

- docker-compose up -d (выведет db и api в статусах Healthy либо Running)
- Креды для ручки /api/auth/login
  - User: email - user@test.com, password - user123
  - Admin: email - admin@test.com, password - admin123