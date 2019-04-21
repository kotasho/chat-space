## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, nul: false, unique: true|
|mail|string|null: false|

### Association
- has_many :groups, through: menbers
- has_many :messages
- has_many :members

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|member|string|null: false|

### Association
- has_many :users
- has_many :messages


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :users
- belongs_to :group
