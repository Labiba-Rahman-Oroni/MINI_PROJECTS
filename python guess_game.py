import random

def play_game():
    print("=" * 40)
    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")
    print("=" * 40)

    # Generate a random number between 1 and 100
    target_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 7

    print(f"You have {max_attempts} chances to guess it right. Good luck!\n")

    while attempts < max_attempts:
        user_input = input(f"Attempt {attempts + 1}/{max_attempts} | Enter your guess: ").strip()

        # Validate that the input is a number
        if not user_input.isdigit():
            print("❌ Invalid input! Please enter a whole number.\n")
            continue

        guess = int(user_input)
        attempts += 1

        # Check the guess
        if guess < target_number:
            print("📈 Too low! Try a higher number.\n")
        elif guess > target_number:
            print("📉 Too high! Try a lower number.\n")
        else:
            print(f"🎉 Congratulations! You guessed the number in {attempts} attempts!")
            break
    else:
        # This runs only if the loop finishes without breaking (out of attempts)
        print(f"💥 Game Over! You ran out of guesses. The correct number was {target_number}.")

if __name__ == '__main__':
    while True:
        play_game()
        play_again = input("Do you want to play again? (yes/no): ").strip().lower()
        if play_again not in ['yes', 'y']:
            print("\nThanks for playing! Goodbye!")
            break
