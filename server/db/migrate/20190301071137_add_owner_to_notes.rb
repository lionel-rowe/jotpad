class AddOwnerToNotes < ActiveRecord::Migration[5.2]
  def change
    add_reference :notes, :owner #, foreign_key: true
  end
end
