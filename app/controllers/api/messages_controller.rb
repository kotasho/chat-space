class Api::MessagesController < ApplicationController
  before_action :set_group
  
  def index
    @messages = Message.all
    respond_to do |format|     
        format.json { @new_messages = @group.messages.where('id > ?', params[:last_id]) }  
      end
    end
      
      def set_group
        @group = Group.find(params[:group_id])
      end
　 end
