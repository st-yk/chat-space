class GroupsController < ApplicationController

  def new
    # 新規グループ作成画面へ移行
  end

  def create
    # 入力されたデータをDBへ登録
    # 表紙画面へリダイレクト
  end

  def edit
    # 編集画面へ移行
  end

  def update
    # 入力されたデータをDBへ登録
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :editgroup
    # 表紙画面へリダイレクト
    end
  end
end