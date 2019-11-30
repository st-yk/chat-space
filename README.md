# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :comments
- has_many  :groups,  through:  :user_group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
|comment|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :comments
- has_many  :users,  through:  :user_group

## user_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|text|null: false|
|group_id|text|null: false|

### Association
- has_many :user_id
- has_many :group_id

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user