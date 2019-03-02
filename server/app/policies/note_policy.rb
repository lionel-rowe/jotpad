class NotePolicy < ApplicationPolicy
  def show?
    is_mine?
  end

  def update?
    is_mine?
  end

  def destroy?
    is_mine?
  end

  private

  def is_mine?
    record.owner == user
  end
end
