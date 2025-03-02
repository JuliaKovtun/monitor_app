class Users::SessionsController < Devise::SessionsController
  # include RackSessionsFix
  respond_to :json

  private

  # TODO: what if login wasn't successful?
  def respond_with(current_user, _opts = {})
    token = request.env['warden-jwt_auth.token']
    response.set_header('Authorization', "Bearer #{token}")

    render json: {
      status: { 
        code: 200, message: 'Logged in successfully.',
        data: { user: current_user }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      begin
        jwt_payload = JWT.decode(
          request.headers['Authorization'].split(' ').last,
          Rails.application.credentials.devise_jwt_secret_key!,
          true,
          algorithm: 'HS256'
        ).first
        current_user = User.find_by(id: jwt_payload['sub'])
      rescue JWT::ExpiredSignature
        return render json: { status: 200, message: "Session expired, logged out successfully." }, status: :ok
      rescue JWT::DecodeError
        return render json: { status: 401, message: "Invalid token, cannot log out." }, status: :unauthorized
      end
    end

    if current_user
      render json: { status: 200, message: "Logged out successfully." }, status: :ok
    else
      render json: { status: 401, message: "Couldn't find an active session." }, status: :unauthorized
    end
  end
end
