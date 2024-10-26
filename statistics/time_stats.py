import math
import re
from time import time


timesFile = open('times.txt', "r")
timeList = []
timeListSeconds = []
timeListSecondsSquared = []
totalTime = 0


for line in timesFile:
    timeList.append(line.rstrip())

timesFile.close()

for i in timeList:
    timeListSeconds.append(float(re.findall('^\d\d',i)[0]) * 3600)
    timeListSeconds[len(timeListSeconds)-1] += float(re.findall(':\d\d:',i)[0].replace(':', '')) * 60
    timeListSeconds[len(timeListSeconds)-1] += float(re.findall('\d\d$',i)[0])


totalCommits = len(timeList)

totalTime = sum(timeListSeconds)

hope =  totalTime / totalCommits


def muestraHoraLinda(hope):
    
    horaEntera = int(math.modf(hope / 3600)[1])
    minutoEntero = int(math.modf(hope / 3600)[0] * 60)
    segundos = math.modf(math.modf(hope / 3600)[0] * 60)[0] * 60
    
    print(str(horaEntera) + ':' +  str(minutoEntero) + ':' + str(segundos))




# Calculo el desvío de los resultados.

def hopeXX(timeListSeconds):
    for i in timeListSeconds:
        timeListSecondsSquared.append(pow(i, 2))
    return sum(timeListSecondsSquared) / totalCommits


desvio = math.sqrt(hopeXX(timeListSeconds) - hope)     #Desvío



print('La hora promedio es:')
muestraHoraLinda(hope)
print('\n')
print('+/- ')
muestraHoraLinda(desvio)
