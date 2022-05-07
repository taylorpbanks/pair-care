/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
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
      quickRec
      price
      image
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        quickRec
        price
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShared = /* GraphQL */ `
  query GetShared($id: ID!) {
    getShared(id: $id) {
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
export const listShareds = /* GraphQL */ `
  query ListShareds(
    $filter: ModelSharedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShareds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
