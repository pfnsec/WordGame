module.exports = {
        typeDefs: /* GraphQL */ `type AggregateLobby {
  count: Int!
}

type AggregateRound {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

enum GameState {
  WAITING
  STARTED
  FINISHED
}

type Lobby {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  state: GameState!
  creator: User!
  partner: User
  creator_word: String
  partner_word: String
  rounds(where: RoundWhereInput, orderBy: RoundOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Round!]
}

type LobbyConnection {
  pageInfo: PageInfo!
  edges: [LobbyEdge]!
  aggregate: AggregateLobby!
}

input LobbyCreateInput {
  state: GameState!
  creator: UserCreateOneInput!
  partner: UserCreateOneInput
  creator_word: String
  partner_word: String
  rounds: RoundCreateManyInput
}

type LobbyEdge {
  node: Lobby!
  cursor: String!
}

enum LobbyOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  state_ASC
  state_DESC
  creator_word_ASC
  creator_word_DESC
  partner_word_ASC
  partner_word_DESC
}

type LobbyPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  state: GameState!
  creator_word: String
  partner_word: String
}

type LobbySubscriptionPayload {
  mutation: MutationType!
  node: Lobby
  updatedFields: [String!]
  previousValues: LobbyPreviousValues
}

input LobbySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LobbyWhereInput
  AND: [LobbySubscriptionWhereInput!]
  OR: [LobbySubscriptionWhereInput!]
  NOT: [LobbySubscriptionWhereInput!]
}

input LobbyUpdateInput {
  state: GameState
  creator: UserUpdateOneRequiredInput
  partner: UserUpdateOneInput
  creator_word: String
  partner_word: String
  rounds: RoundUpdateManyInput
}

input LobbyUpdateManyMutationInput {
  state: GameState
  creator_word: String
  partner_word: String
}

input LobbyWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  state: GameState
  state_not: GameState
  state_in: [GameState!]
  state_not_in: [GameState!]
  creator: UserWhereInput
  partner: UserWhereInput
  creator_word: String
  creator_word_not: String
  creator_word_in: [String!]
  creator_word_not_in: [String!]
  creator_word_lt: String
  creator_word_lte: String
  creator_word_gt: String
  creator_word_gte: String
  creator_word_contains: String
  creator_word_not_contains: String
  creator_word_starts_with: String
  creator_word_not_starts_with: String
  creator_word_ends_with: String
  creator_word_not_ends_with: String
  partner_word: String
  partner_word_not: String
  partner_word_in: [String!]
  partner_word_not_in: [String!]
  partner_word_lt: String
  partner_word_lte: String
  partner_word_gt: String
  partner_word_gte: String
  partner_word_contains: String
  partner_word_not_contains: String
  partner_word_starts_with: String
  partner_word_not_starts_with: String
  partner_word_ends_with: String
  partner_word_not_ends_with: String
  rounds_every: RoundWhereInput
  rounds_some: RoundWhereInput
  rounds_none: RoundWhereInput
  AND: [LobbyWhereInput!]
  OR: [LobbyWhereInput!]
  NOT: [LobbyWhereInput!]
}

input LobbyWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createLobby(data: LobbyCreateInput!): Lobby!
  updateLobby(data: LobbyUpdateInput!, where: LobbyWhereUniqueInput!): Lobby
  updateManyLobbies(data: LobbyUpdateManyMutationInput!, where: LobbyWhereInput): BatchPayload!
  upsertLobby(where: LobbyWhereUniqueInput!, create: LobbyCreateInput!, update: LobbyUpdateInput!): Lobby!
  deleteLobby(where: LobbyWhereUniqueInput!): Lobby
  deleteManyLobbies(where: LobbyWhereInput): BatchPayload!
  createRound(data: RoundCreateInput!): Round!
  updateRound(data: RoundUpdateInput!, where: RoundWhereUniqueInput!): Round
  updateManyRounds(data: RoundUpdateManyMutationInput!, where: RoundWhereInput): BatchPayload!
  upsertRound(where: RoundWhereUniqueInput!, create: RoundCreateInput!, update: RoundUpdateInput!): Round!
  deleteRound(where: RoundWhereUniqueInput!): Round
  deleteManyRounds(where: RoundWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  lobby(where: LobbyWhereUniqueInput!): Lobby
  lobbies(where: LobbyWhereInput, orderBy: LobbyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Lobby]!
  lobbiesConnection(where: LobbyWhereInput, orderBy: LobbyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LobbyConnection!
  round(where: RoundWhereUniqueInput!): Round
  rounds(where: RoundWhereInput, orderBy: RoundOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Round]!
  roundsConnection(where: RoundWhereInput, orderBy: RoundOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoundConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Round {
  id: ID!
  word1: String!
  word2: String!
}

type RoundConnection {
  pageInfo: PageInfo!
  edges: [RoundEdge]!
  aggregate: AggregateRound!
}

input RoundCreateInput {
  word1: String!
  word2: String!
}

input RoundCreateManyInput {
  create: [RoundCreateInput!]
  connect: [RoundWhereUniqueInput!]
}

type RoundEdge {
  node: Round!
  cursor: String!
}

enum RoundOrderByInput {
  id_ASC
  id_DESC
  word1_ASC
  word1_DESC
  word2_ASC
  word2_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RoundPreviousValues {
  id: ID!
  word1: String!
  word2: String!
}

input RoundScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  word1: String
  word1_not: String
  word1_in: [String!]
  word1_not_in: [String!]
  word1_lt: String
  word1_lte: String
  word1_gt: String
  word1_gte: String
  word1_contains: String
  word1_not_contains: String
  word1_starts_with: String
  word1_not_starts_with: String
  word1_ends_with: String
  word1_not_ends_with: String
  word2: String
  word2_not: String
  word2_in: [String!]
  word2_not_in: [String!]
  word2_lt: String
  word2_lte: String
  word2_gt: String
  word2_gte: String
  word2_contains: String
  word2_not_contains: String
  word2_starts_with: String
  word2_not_starts_with: String
  word2_ends_with: String
  word2_not_ends_with: String
  AND: [RoundScalarWhereInput!]
  OR: [RoundScalarWhereInput!]
  NOT: [RoundScalarWhereInput!]
}

type RoundSubscriptionPayload {
  mutation: MutationType!
  node: Round
  updatedFields: [String!]
  previousValues: RoundPreviousValues
}

input RoundSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RoundWhereInput
  AND: [RoundSubscriptionWhereInput!]
  OR: [RoundSubscriptionWhereInput!]
  NOT: [RoundSubscriptionWhereInput!]
}

input RoundUpdateDataInput {
  word1: String
  word2: String
}

input RoundUpdateInput {
  word1: String
  word2: String
}

input RoundUpdateManyDataInput {
  word1: String
  word2: String
}

input RoundUpdateManyInput {
  create: [RoundCreateInput!]
  update: [RoundUpdateWithWhereUniqueNestedInput!]
  upsert: [RoundUpsertWithWhereUniqueNestedInput!]
  delete: [RoundWhereUniqueInput!]
  connect: [RoundWhereUniqueInput!]
  disconnect: [RoundWhereUniqueInput!]
  deleteMany: [RoundScalarWhereInput!]
  updateMany: [RoundUpdateManyWithWhereNestedInput!]
}

input RoundUpdateManyMutationInput {
  word1: String
  word2: String
}

input RoundUpdateManyWithWhereNestedInput {
  where: RoundScalarWhereInput!
  data: RoundUpdateManyDataInput!
}

input RoundUpdateWithWhereUniqueNestedInput {
  where: RoundWhereUniqueInput!
  data: RoundUpdateDataInput!
}

input RoundUpsertWithWhereUniqueNestedInput {
  where: RoundWhereUniqueInput!
  update: RoundUpdateDataInput!
  create: RoundCreateInput!
}

input RoundWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  word1: String
  word1_not: String
  word1_in: [String!]
  word1_not_in: [String!]
  word1_lt: String
  word1_lte: String
  word1_gt: String
  word1_gte: String
  word1_contains: String
  word1_not_contains: String
  word1_starts_with: String
  word1_not_starts_with: String
  word1_ends_with: String
  word1_not_ends_with: String
  word2: String
  word2_not: String
  word2_in: [String!]
  word2_not_in: [String!]
  word2_lt: String
  word2_lte: String
  word2_gt: String
  word2_gte: String
  word2_contains: String
  word2_not_contains: String
  word2_starts_with: String
  word2_not_starts_with: String
  word2_ends_with: String
  word2_not_ends_with: String
  AND: [RoundWhereInput!]
  OR: [RoundWhereInput!]
  NOT: [RoundWhereInput!]
}

input RoundWhereUniqueInput {
  id: ID
}

type Subscription {
  lobby(where: LobbySubscriptionWhereInput): LobbySubscriptionPayload
  round(where: RoundSubscriptionWhereInput): RoundSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  nick: String!
  inLobby: ID
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  nick: String!
  inLobby: ID
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  nick_ASC
  nick_DESC
  inLobby_ASC
  inLobby_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  nick: String!
  inLobby: ID
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  nick: String
  inLobby: ID
}

input UserUpdateInput {
  nick: String
  inLobby: ID
}

input UserUpdateManyMutationInput {
  nick: String
  inLobby: ID
}

input UserUpdateOneInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  nick: String
  nick_not: String
  nick_in: [String!]
  nick_not_in: [String!]
  nick_lt: String
  nick_lte: String
  nick_gt: String
  nick_gte: String
  nick_contains: String
  nick_not_contains: String
  nick_starts_with: String
  nick_not_starts_with: String
  nick_ends_with: String
  nick_not_ends_with: String
  inLobby: ID
  inLobby_not: ID
  inLobby_in: [ID!]
  inLobby_not_in: [ID!]
  inLobby_lt: ID
  inLobby_lte: ID
  inLobby_gt: ID
  inLobby_gte: ID
  inLobby_contains: ID
  inLobby_not_contains: ID
  inLobby_starts_with: ID
  inLobby_not_starts_with: ID
  inLobby_ends_with: ID
  inLobby_not_ends_with: ID
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`
      }
    