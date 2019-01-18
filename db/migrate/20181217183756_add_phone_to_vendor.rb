class AddPhoneToVendor < ActiveRecord::Migration[5.2]
  def change
    add_column :spree_vendors, :phone, :text
  end
end
