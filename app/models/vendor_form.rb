class VendorForm
  include ActiveModel::Conversion
  extend  ActiveModel::Naming

  attr_accessor :name, :email, :phone, :business_name, :address, :password, :confirm_password, :year_of_incorporation, :recent_sales_volume, :product_or_service_reference, :copy_of_bussines_licence, :card_number, :card_holder_name, :account_holder_name, :country, :bank_account_number, :confirm_bank_account_no

  def initialize(hsh = {})
    hsh.each do |key, value|
      self.send(:"#{key}=", value)
    end

    @vendor = Spree::Vendor.new
    @vendor.name = self.name
    @vendor.state = :pending
    @vendor.address = self.address
    @vendor.phone = self.phone.to_s
    @vendor.business_name = self.business_name
    @vendor.year_of_incorporation = self.year_of_incorporation
    @vendor.recent_sales_volume = self.recent_sales_volume.to_s
    @vendor.product_or_service_reference = self.product_or_service_reference

    @user = Spree::User.new
    @user.email = self.email
    @user.password = self.password
    @user.password_confirmation = self.confirm_password
    @user.vendors = [ @vendor ]

    @role = Spree::Role.where("name = :role", { :role => :user } ).first

    @user.spree_roles = [ @role ]
  end

  def user
    return @user
  end

  def valid?
    [ @vendor, @user ].each do |obj| 
      if not obj.valid?
        puts obj.inspect
        obj.errors.each do |field, problems|
          puts "====> Field: " + field.to_s + " Error: " + problems.to_s
        end
      end
    end
    
    return @vendor.valid? && @user.valid?
  end
end
