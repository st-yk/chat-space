class GroupsController < ApplicationController

  before_action :set_group, only: [:edit, :update]


  def index
  end

  def new
    # 新規グループ作成画面へ移行
    @group =Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
    # 入力されたデータをDBへ登録
    # 表紙画面へリダイレクト
  end

  def edit
    # 編集画面へ移行
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path, notice: 'グループを更新しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
