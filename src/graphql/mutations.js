/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      sub
      email
      stageId
      categoryId
      type
      brand
      item
      link
      age
      toAge
      isRecommended
      comments
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      sub
      email
      stageId
      categoryId
      type
      brand
      item
      link
      age
      toAge
      isRecommended
      comments
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      sub
      email
      stageId
      categoryId
      type
      brand
      item
      link
      age
      toAge
      isRecommended
      comments
      createdAt
      updatedAt
    }
  }
`;
export const createShared = /* GraphQL */ `
  mutation CreateShared(
    $input: CreateSharedInput!
    $condition: ModelSharedConditionInput
  ) {
    createShared(input: $input, condition: $condition) {
      id
      fromName
      fromEmail
      fromSub
      toEmail
      toName
      customMessage
      createdAt
      updatedAt
    }
  }
`;
export const updateShared = /* GraphQL */ `
  mutation UpdateShared(
    $input: UpdateSharedInput!
    $condition: ModelSharedConditionInput
  ) {
    updateShared(input: $input, condition: $condition) {
      id
      fromName
      fromEmail
      fromSub
      toEmail
      toName
      customMessage
      createdAt
      updatedAt
    }
  }
`;
export const deleteShared = /* GraphQL */ `
  mutation DeleteShared(
    $input: DeleteSharedInput!
    $condition: ModelSharedConditionInput
  ) {
    deleteShared(input: $input, condition: $condition) {
      id
      fromName
      fromEmail
      fromSub
      toEmail
      toName
      customMessage
      createdAt
      updatedAt
    }
  }
`;
