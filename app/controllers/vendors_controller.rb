
class VendorsController < Spree::BaseController
    skip_before_action :verify_authenticity_token, only: [ :vendor_exists, :user_exists, :create ]

    EXISTS_RESPONSE = { :exists => true }
    DOES_NOT_EXISTS_RESPONSE = { :exists => false }

    def new
      @vendor_form = VendorForm.new
    end

    def vendor_dashboard

    end

    def create
      # To Pre-populate data on error form save
      vendor_form = VendorForm.new(params[:form])

      if not vendor_form.valid?
        render json: { :error => "Validation Failures"}, status: :bad_request
        return
      end

      user = vendor_form.user

      begin
        user.save!
        head :ok
        session[:signup]=true
      rescue Exception => e
        puts "unable to save due to: " + e.to_s
        render json: { :error => e.to_s }, status: :bad_request
      end
    end

    def register_success

    end

    def vendor_exists
      name = params[:vendor_name]

      response =  DOES_NOT_EXISTS_RESPONSE
      
        if Spree::Vendor.where("lower(name) = ?", name.strip.downcase).any? 
          response = EXISTS_RESPONSE
        end
      render json: response
    end

    def user_exists
      email = params[:email]

      response =  DOES_NOT_EXISTS_RESPONSE

      if  Spree::User.where("lower(email) = ?", email.strip.downcase).any?
        response = EXISTS_RESPONSE
      end

      render json: response
    end
end
