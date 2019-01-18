class AddFieldsToVendor < ActiveRecord::Migration[5.2]
  def change
  	add_column :spree_vendors, :product_category, :text
  	add_column :spree_vendors, :year_of_incorporation, :string
  	add_column :spree_vendors, :copy_of_bussines_licence, :string
  	add_column :spree_vendors, :recent_sales_volume, :integer
  	add_column :spree_vendors, :product_or_service_reference, :text
  end
end
