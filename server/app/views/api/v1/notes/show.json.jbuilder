json.data do
  json.id @note.id
  json.type 'note'
  json.attributes do
    json.extract! @note, :title, :content, :created_at, :updated_at
  end
end
