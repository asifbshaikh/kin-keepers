module Spree
  module Admin
    class VendorDashboardController < Spree::Admin::BaseController
      before_action :authorize
      before_action :load_vendor

      def index
      end

      def authorize
        authorize! :manage, :vendor_dashboard
      end

      def load_vendor
        @vendor = current_spree_vendor
      end
    end
  end
end
