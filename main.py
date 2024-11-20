import random

def flatten(x):
    result = []
    for el in x:
        if hasattr(el, "__iter__") and not isinstance(el, str):
            result.extend(flatten(el))
        else:
            result.append(el)
    return result

palabras_clave = []

def upper(lista_completa):
    for i in range(len(lista_completa)):
        cap = random.randint(1, 3)
        if cap == 2:
            lista_completa[i] = lista_completa[i].upper()
    return lista_completa

# Ingresar strings en tupla
while True:
    try:
        veces = int(input("Ingresar la cantidad de palabras que se van a randomizar: "))
    except ValueError:
        print("Tiene que ingresar un numero entero... intentelo de nuevo.")
    except:
        print("Ha ocurrido un error... intentelo de nuevo")
    else:
        if veces == 0:
            print("Tiene que ingresar un numero distinto de 0... intentelo de nuevo")
        else:
            break

print(f"Ingresar las {veces} palabras clave: ")
for i in range(veces):
    palabras = input()
    listaPalabras = list(palabras)
    palabras_clave.append(listaPalabras)

set_max_length = input("¿Desea establecer una longitud máxima para la contraseña final? (S/N): ").strip().lower()
if set_max_length == 's':
    while True:
        try:
            max_length = int(input("Ingresar la longitud máxima de la contraseña final: "))
        except ValueError:
            print("Tiene que ingresar un numero entero... intentelo de nuevo.")
        except:
            print("Ha ocurrido un error... intentelo de nuevo")
        else:
            if max_length <= 0:
                print("Tiene que ingresar un numero positivo... intentelo de nuevo")
            else:
                break
else:
    max_length = None

print(palabras_clave)
lista_completa = flatten(palabras_clave)
password = upper(lista_completa)
print(password)
random.shuffle(password)
print(password)
contraseña = "".join(password)

if max_length is not None and len(contraseña) > max_length:
    contraseña = contraseña[:max_length]

print(contraseña)