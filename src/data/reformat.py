import json

# Function to load data from a JSON file
def load_data_from_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Function to reformat the data
def reformat_data(data):
    categories = []

    for app_type in data['app_types']:
        if 'application_type_id' not in app_type:
            category = {
                'id': app_type['id'],
                'name': app_type['name'],
                'description': app_type.get('description', ''),
                'subcategories': []
            }

            # Find applications of this category
            for app in data['app_types']:
                if app.get('application_type_id') == app_type['id']:
                    category['subcategories'].append({
                        'id': app['id'],
                        'name': app['name'],
                        'subcategories': None  # No subcategories for individual apps
                    })

            categories.append(category)

    return {'categories': categories}

# Function to save the reformatted data to a new file
def save_data_to_file(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

# Main function to handle the entire process
def main():
    input_file = 'application-types.json'  # Path to your input JSON file
    output_file = 'reformatted_data.json'  # Path to save the reformatted data

    # Load the original data from the file
    data = load_data_from_file(input_file)

    # Reformat the data
    reformatted_data = reformat_data(data)

    # Save the reformatted data to a new file
    save_data_to_file(reformatted_data, output_file)

    print(f"Reformatted data saved to {output_file}")

# Run the script
if __name__ == '__main__':
    main()
