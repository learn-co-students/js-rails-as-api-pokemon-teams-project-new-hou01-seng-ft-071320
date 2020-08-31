class PokemonsController < ApplicationController

    before_action :get_pokemon, only:[:destroy]


    def index
        @pokemons = Pokemon.all

        render :json => @pokemons
    end

    def create

        @trainer = Trainer.all.find_by(id: pokemon_params[:trainer_id])

        if @trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])
        end

        render :json => { "message": "This pokemon was created." }
    end

    def destroy
        @pokemon.destroy
    
        # render :json => { "message": "This pokemon was released." }
    end


    private

    def get_pokemon
        @pokemon = Pokemon.all.find_by(id: params[:id])
    end

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end

end
