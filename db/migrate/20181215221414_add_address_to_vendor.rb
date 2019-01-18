class AddAddressToVendor < ActiveRecord::Migration[5.2]
  def change
    add_column :spree_vendors, :address, :text
  end
end
