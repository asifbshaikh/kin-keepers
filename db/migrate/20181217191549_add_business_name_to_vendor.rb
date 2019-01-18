class AddBusinessNameToVendor < ActiveRecord::Migration[5.2]
  def change
    add_column :spree_vendors, :business_name, :text
  end
end
