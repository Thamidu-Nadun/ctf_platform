export class ValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValueError";
  }
}
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}
export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}
export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}
export class ServiceUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceUnavailableError";
  }
}
export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
  }
}
export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotImplementedError";
  }
}
export class BadGatewayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadGatewayError";
  }
}
export class ContainerCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContainerCreationError";
  }
}
export class ContainerDeletionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContainerDeletionError";
  }
}
export class ContainerNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContainerNotFoundError";
  }
}
export class ContainerTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContainerTimeoutError";
  }
}
export class ContainerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContainerError";
  }
}
export class ContainerAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContainerAlreadyExistsError";
  }
}
export class ContainerNotRunningError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContainerNotRunningError";
  }
}
