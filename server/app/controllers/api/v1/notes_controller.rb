class Api::V1::NotesController < Api::V1::BaseController

  # skip_before_action :verify_authenticity_token # TODO

  before_action :set_note, only: [ :show, :update, :destroy ]

  def index
    # p current_api_v1_user
    # p current_user
    # p JSON.generate(request)

    notes_all = Note.where(owner: current_resource_owner)
    # notes_all = Note.all

    @notes = notes_all.order(updated_at: :desc)
  end

  def show
  end

  def update
    if @note.update(note_params)
      render :show
    else
      render_error
    end
  end

  def create
    @note = Note.new(note_params)
    # authorize @note # TODO: re-add

    if @note.save
      render :show, status: :created
    else
      render_error
    end
  end

  def destroy
    @note.destroy
    head :no_content
    # No need to create a `destroy.json.jbuilder` view
  end

  private

  def set_note

    @note = Note.find(params[:id])

    if @note.owner != current_resource_owner
      raise
    end             # TODO: use doorkeeper properly
  end

  def note_params
    params.require(:data).require(:attributes).permit(:title, :content)
  end

  def render_error
    render json: { errors: @note.errors.full_messages },
      status: :unprocessable_entity
  end

end
